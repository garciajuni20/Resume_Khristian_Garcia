/** "Alleviate Financial Solutions (via Icon Solutions Group)" -> "Alleviate Financial Solutions"; "Virtrify — placed with…" -> "Virtrify" */
export function shortCompany(company: string): string {
  return (company.split(' — ')[0].split(' / ').pop() ?? company).replace(/\s*\(.*\)$/, '').trim();
}
