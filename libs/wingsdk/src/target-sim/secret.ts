import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { SecretSchema } from "./schema-resources";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import { ResourceNames } from "../shared/resource-names";
import { BaseResourceSchema } from "../simulator/simulator";
import { IInflightHost } from "../std";

/**
 * Simulator implementation of `cloud.Secret`
 *
 * @inflight `@winglang/sdk.cloud.ISecretClient`
 */
export class Secret extends cloud.Secret implements ISimulatorResource {
  private readonly name: string;
  constructor(scope: Construct, id: string, props: cloud.SecretProps = {}) {
    super(scope, id, props);

    this.name =
      props.name ??
      ResourceNames.generateName(this, { disallowedRegex: /[^\w]/g });
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host);
    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }

  /** @internal */
  public _supportedOps(): string[] {
    return [
      cloud.SecretInflightMethods.VALUE,
      cloud.SecretInflightMethods.VALUE_JSON,
    ];
  }

  public toSimulator(): BaseResourceSchema {
    const schema: SecretSchema = {
      type: cloud.SECRET_FQN,
      path: this.node.path,
      props: {
        name: this.name,
      },
      attrs: {} as any,
    };
    return schema;
  }
}
