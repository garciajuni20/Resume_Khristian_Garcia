/** "Icon Solutions Group S.A / Alleviate Financial Solutions" -> "Alleviate Financial Solutions"; "Virtrify — placed with…" -> "Virtrify" */
export function shortCompany(company: string): string {
  return company.split(' — ')[0].split(' / ').pop()?.trim() ?? company;
}
