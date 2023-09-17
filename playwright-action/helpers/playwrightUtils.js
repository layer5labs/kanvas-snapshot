//@ts-check

//Defining test functions for playwright to be used in the spec file

//Login to be used for settingup tests
export async function login(page, username, password) {
      await page.goto('https://meshery.layer5.io/login');
      await page.locator('input[name="identifier"]').fill(username);
      // Press the Tab key (to move to the password field)
      await page.locator('input[name="identifier"]').press('Tab');
      await page.fill('input[name="password"]',password)
      await page.waitForSelector('input[name="password"]');
      await page.fill('input[name="password"]', password);

      // Wait for the "Sign in" button to appear and then click it
      const signInButton = await page.waitForSelector('button[type="submit"]');
      await signInButton.click(); 
      // Wait for some time (e.g., 5 seconds) for any post-login actions or page navigation to complete
      await page.waitForTimeout(5000);
      const logout =  await page.locator('a[href="/logout"]')
      await page.close()
} 

export async function MesheryPlayground(page){
      await page.goto('https://playground.meshery.io/')
      const mesheryHeading = await page.locator('h1:has-text("Meshery")');
      // Describe the "Dashboard" element 
      const dashboardLink = await page.locator('h2:has-text("Dashboard")');
      const lifecycleLink = await page.locator('a[href="/management"]');
      const configurationsLink = await page.locator('a[href="/configuration/application"]');
      const performanceLink = await page.locator('a[href="/performance"]');
      const extensionsLink = await page.locator('a[href="/extension"]');
      const meshmapLink = await page.locator('a[href="/extension/meshmap"]');
      await page.waitForTimeout(10000)
      await page.close()
}

export async function MeshMap(page){
      await page.goto('https://playground.meshery.io/extension/meshmap');
      const meshMapBetaHeading = page.locator('h1:has-text(/MeshMap\s*beta/i)');
     // Use page.locator() to describe the headings under "MeshMap beta."
      const designsHeading = page.locator('h1:has-text(/MeshMap\\s*beta/i) + h2:has-text("Designs")');
      const componentsHeading = page.locator('h1:has-text(/MeshMap\\s*beta/i) + h2:has-text("Components")');
      const applicationsHeading = page.locator('h1:has-text(/MeshMap\\s*beta/i) + h2:has-text("Applications")');
      await page.waitForTimeout(10000)
      await page.close()
}