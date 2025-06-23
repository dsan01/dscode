export const Prose = ({ children }) => {
  return (
    <article className="prose prose-li:text-base prose-ul:list-disc prose-ul:list-outside prose-li:font-body prose-headings:font-title prose-headings:font-medium prose-headings:text-neutral-700 prose-h1:text-5xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-1xl prose-img:rounded-lg prose-img:shadow prose-a:text-neutral-600 prose-a:hover:text-neutral-700 prose-hr:border-neutral-500 font-body text-neutral-800 *:m-0">
      {children}
    </article>
  );
};
