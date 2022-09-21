import { CubeIcon, GlobeAltIcon } from "@heroicons/react/20/solid";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { ConstructSchema, ResourceSchema } from "@monadahq/wing-local-schema";

import { ResourceIcon } from "@/stories/utils";

export interface NodeAttribute {
  key: string;
  value?: string;
  render?(): JSX.Element;
}

export interface BaseNodeAttributesProps {
  attributes: NodeAttribute[];
}

export function BaseNodeAttributes({ attributes }: BaseNodeAttributesProps) {
  return (
    <div className="">
      <dl className="sm:divide-y sm:divide-gray-200">
        {attributes.map((attribute) => {
          return (
            <div
              key={attribute.key}
              className="px-3 py-2.5 sm:grid sm:grid-cols-4 sm:gap-2 group"
            >
              <dt className="text-sm font-medium text-gray-500">
                {attribute.key}
              </dt>
              <dd
                className="mt-1 text-sm text-gray-900 sm:col-span-3 sm:mt-0 flex items-center gap-2 min-w-0"
                title={attribute.value}
              >
                <span className="truncate">
                  {attribute.render?.() ?? attribute.value}
                </span>
                {attribute.value && (
                  <button className="invisible group-hover:visible flex-shrink-0 max-w-full truncate bg-slate-50 border border-slate-300 shadow-sm text-xs px-1.5 py-0.5 items-center gap-1.5 cursor-pointer hover:bg-slate-100 min-w-0 rounded">
                    <DocumentDuplicateIcon
                      className="w-4 h-4 text-slate-600"
                      aria-hidden="true"
                    />
                  </button>
                )}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

function getBaseAttributes(node: ResourceSchema) {
  return [
    {
      key: "ID",
      value: node.id,
    },
    {
      key: "Path",
      value: node.path,
    },
    {
      key: "Type",
      value: node.type,
      render: () => (
        <div className="truncate cursor-auto select-none">
          <div className="inline-flex items-center gap-1 px-1 bg-slate-100 border border-slate-200 rounded max-w-full truncate">
            <ResourceIcon
              resourceType={node.type}
              className="w-4 h-4"
              aria-hidden="true"
            />
            <div className="truncate">{node.type}</div>
          </div>
        </div>
      ),
    },
    // {
    //   key: "Source File",
    //   value: "/Users/Wing/Code/wing-demo/src/demo.w",
    //   render: () => (
    //     <button className="font-medium text-indigo-600 hover:text-indigo-500">
    //       {meta.source.fileName} ({meta.source.line}:{meta.source.column})
    //     </button>
    //   ),
    // },
  ];
}

function getNodeAttributes(node: ResourceSchema) {
  let attributes = getBaseAttributes(node);

  // if (node.type === "cloud.Endpoint") {
  //   attributes = [...attributes, {key: "URL", value: node.props.}]
  // }

  return attributes;
}

export interface NodeAttributesProps {
  node: ResourceSchema;
}

export function NodeAttributes({ node }: NodeAttributesProps) {
  const attributes = getNodeAttributes(node);
  return <BaseNodeAttributes attributes={attributes} />;
}
