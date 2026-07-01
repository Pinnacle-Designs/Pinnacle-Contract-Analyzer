/** Full-page navigation (e.g. Stripe Checkout). Kept outside components for React Compiler lint rules. */
export function redirectTo(url: string): void {
  window.location.assign(url);
}
