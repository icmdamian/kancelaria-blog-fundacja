import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { type FC } from "react";
import type { BlocksContent } from "../../lib/strapi";

interface BlockContentProps {
  content: BlocksContent;
}

const BlocksContentRenderer: FC<BlockContentProps> = ({ content }) => {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        heading: ({ children, level }) => {
          switch (level) {
            case 1:
              return (
                <h1 className="text-3xl text-rbd-primary font-bold mt-6 mb-4">{children}</h1>
              );
            case 2:
              return (
                <h2 className="text-2xl text-rbd-primary font-bold mt-5 mb-3">{children}</h2>
              );
            case 3:
              return (
                <h3 className="text-xl text-rbd-primary font-bold mt-4 mb-2">{children}</h3>
              );
            case 4:
              return (
                <h4 className="text-lg text-rbd-primary font-bold mt-3 mb-2">{children}</h4>
              );
            case 5:
              return (
                <h5 className="text-base text-rbd-primary font-bold mt-3 mb-1">{children}</h5>
              );
            case 6:
              return (
                <h6 className="text-sm text-rbd-primary font-bold mt-3 mb-1">{children}</h6>
              );
            default:
              return (
                <h2 className="text-2xl text-rbd-primary font-bold mt-5 mb-3">{children}</h2>
              );
          }
        },
        paragraph: ({ children }) => {
          return <p className="mb-4 leading-relaxed">{children}</p>;
        },
        list: ({ children, format }) => {
          if (format === "ordered") {
            return (
              <ol className="list-decimal ml-6 mb-4 space-y-2">{children}</ol>
            );
          }
          return <ul className="list-disc ml-6 mb-4 space-y-2">{children}</ul>;
        },
        "list-item": ({ children }) => {
          return <li className="leading-normal">{children}</li>;
        },
        link: ({ children, url }) => {
          return (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {children}
            </a>
          );
        },
        image: ({ image }) => {
          return (
            <figure className="my-6">
              <img
                src={image.url}
                alt={image.alternativeText || "Blog post image"}
                className="max-w-full rounded-lg"
                loading="lazy"
              />
            </figure>
          );
        },
        quote: ({ children }) => {
          return (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic my-6">
              {children}
            </blockquote>
          );
        },
        code: ({ children }) => {
          return (
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4">
              <code>{children}</code>
            </pre>
          );
        },
      }}
      modifiers={{
        bold: ({ children }) => {
          return <strong>{children}</strong>;
        },
        italic: ({ children }) => {
          return <em>{children}</em>;
        },
        underline: ({ children }) => {
          return <u>{children}</u>;
        },
        strikethrough: ({ children }) => {
          return <del>{children}</del>;
        },
        code: ({ children }) => {
          return <code>{children}</code>;
        },
      }}
    />
  );
};

export default BlocksContentRenderer;
