import { Page } from "@/components/layout/Page";

export function ShowcaseAboutPage() {
  return (
    <Page>
      <section id="about" className="p-4 my-4">
        <article className="max-w-[68ch] mx-auto">
          <h1 className="text-4xl font-light mb-4">About this Showcase</h1>

          <p>
            While most of my professional work is proprietary and can't be
            shared publicly, I've created this portfolio to showcase my
            front-end development skills and expertise. This collection
            highlights my ability to build intuitive and performant user
            interfaces, as well as solve complex technical challenges. It offers
            a clear window into my capabilities.
          </p>
        </article>
      </section>
    </Page>
  );
}
