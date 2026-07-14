import { expect, test } from "@playwright/test";

const locales = ["en", "ar", "fr", "tr"] as const;
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

for (const viewport of viewports) {
  test(`${viewport.name} localized public routes`, async ({ page }) => {
    await page.setViewportSize(viewport);
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));

    for (const locale of locales) {
      for (const path of [`/${locale}`, `/${locale}/configure`]) {
        await page.goto(path, { waitUntil: "networkidle" });
        await expect(page.locator("html")).toHaveAttribute("lang", locale);
        await expect(page.locator("html")).toHaveAttribute("dir", locale === "ar" ? "rtl" : "ltr");
        await expect(page.locator("h1")).toHaveCount(1);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow, `${path} horizontal overflow`).toBeLessThanOrEqual(1);
        const brokenImages = await page.locator("img").evaluateAll((images) => images.filter((image) => !image.complete || image.naturalWidth === 0).length);
        expect(brokenImages, `${path} broken images`).toBe(0);
        const unlabelledFields = await page.locator("input, select, textarea").evaluateAll((fields) => fields.filter((field) => !(field instanceof HTMLInputElement && field.type === "hidden") && field.labels?.length === 0).length);
        expect(unlabelledFields, `${path} unlabelled form fields`).toBe(0);
      }
    }
    expect(errors).toEqual([]);
  });
}

test("language switch and admin regression", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto("/en", { waitUntil: "networkidle" });
  await page.locator('header a[href="/ar"]').click();
  await expect(page).toHaveURL(/\/ar$/);
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");

  await page.goto("/admin/login", { waitUntil: "networkidle" });
  await page.getByLabel("Kullanıcı Adı").fill(process.env.ADMIN_USERNAME ?? "");
  await page.getByLabel("Parola").fill(process.env.ADMIN_PASSWORD ?? "");
  await page.getByRole("button", { name: "Giriş Yap" }).click();
  await expect(page).toHaveURL(/\/project-office$/);
  await expect(page.getByText(`Yönetici: ${process.env.ADMIN_USERNAME}`)).toBeVisible();
  await page.getByRole("button", { name: "Çıkış Yap" }).click();
  await expect(page).toHaveURL(/\/admin\/login$/);
  expect(errors).toEqual([]);
});
