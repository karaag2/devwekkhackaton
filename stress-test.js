/**
 * LOAD TEST SCRIPT (Node.js)
 * Simulates concurrent users performing a sequence of actions.
 */

const BASE_URL = "https://agustin-jaillike-zander.ngrok-free.dev"; // Your Ngrok URL
const CONCURRENT_USERS = 200;
const DURATION_SECONDS = 30;

async function simulateUser(id) {
    const startTime = Date.now();
    let stats = { success: 0, fail: 0, steps: [] };

    try {
        // Step 1: Visit Landing Page
        let start = Date.now();
        await fetch(`${BASE_URL}/fr`);
        stats.steps.push({ name: 'Landing', duration: Date.now() - start });
        stats.success++;

        // Step 2: Visit Login Page
        start = Date.now();
        await fetch(`${BASE_URL}/fr/login`);
        stats.steps.push({ name: 'Login Page', duration: Date.now() - start });
        stats.success++;

        // Step 3: Attempt API Login (Simulate check-session or sign-up attempt)
        // We hit the session endpoint which is frequently called by the middleware
        start = Date.now();
        const res = await fetch(`${BASE_URL}/api/auth/get-session`, {
            headers: { 'Cookie': 'fake-session-cookie-for-test' }
        });
        stats.steps.push({ name: 'Auth Check', duration: Date.now() - start });
        
        if (res.status >= 500) throw new Error('Server Error');
        stats.success++;

        // Step 4: Visit Dashboard
        start = Date.now();
        await fetch(`${BASE_URL}/fr/dashboard`);
        stats.steps.push({ name: 'Dashboard', duration: Date.now() - start });
        stats.success++;

    } catch (err) {
        // console.error(`User ${id} failed:`, err.message);
        stats.fail++;
    }

    return stats;
}

async function runTest() {
    console.log(`\n🚀 STARTING STRESS TEST ON: ${BASE_URL}`);
    console.log(`👥 Concurrent Users: ${CONCURRENT_USERS}`);
    console.log(`⏱️  Duration: ${DURATION_SECONDS}s\n`);

    const users = [];
    const overallStats = { totalSuccess: 0, totalFail: 0, times: [] };

    // Run users in batches to reach concurrency
    const startTime = Date.now();
    
    while ((Date.now() - startTime) < DURATION_SECONDS * 1000) {
        const batch = Array.from({ length: CONCURRENT_USERS }, (_, i) => simulateUser(i));
        const results = await Promise.all(batch);
        
        results.forEach(r => {
            overallStats.totalSuccess += r.success;
            overallStats.totalFail += r.fail;
            r.steps.forEach(s => overallStats.times.push(s.duration));
        });

        // Small pause between batches to not instantly kill the process itself
        await new Promise(r => setTimeout(r, 500));
    }

    const totalTime = (Date.now() - startTime) / 1000;
    const avgTime = overallStats.times.reduce((a, b) => a + b, 0) / overallStats.times.length;

    console.log(`\n--- 📊 TEST RESULTS ---`);
    console.log(`✅ Total Successful Requests: ${overallStats.totalSuccess}`);
    console.log(`❌ Total Failed Requests: ${overallStats.totalFail}`);
    console.log(`⏲️  Average Response Time: ${avgTime.toFixed(2)}ms`);
    console.log(`📈 Requests Per Second: ${(overallStats.totalSuccess / totalTime).toFixed(2)} req/s`);
    console.log(`-----------------------\n`);

    if (overallStats.totalFail > 0) {
        console.log("⚠️  WARNING: Serious bottleneck detected. SQLite or Dev Server is failing.");
    } else {
        console.log("💎 UNBELIEVABLE: It held up (for now).");
    }
}

runTest();
