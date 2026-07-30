import { ButtonLink, Container } from "@/components/primitives";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col justify-center py-24">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 max-w-[16ch] text-(length:--text-h1) tracking-[-0.03em]">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-6 max-w-md text-(length:--text-lead) leading-relaxed text-ink-secondary">
        A dead link, a typo, or something I moved. The work is all still here.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <ButtonLink href="/">Back home</ButtonLink>
        <ButtonLink href="/work" variant="secondary">
          Selected work
        </ButtonLink>
      </div>
    </Container>
  );
}
