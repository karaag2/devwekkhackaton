/**
 * REAL-TIME STRESS TEST WITH ERROR IDENTIFICATION
 * Target: Vercel + Render PostgreSQL
 */

const BASE_URL = "https://devweekhackaton.vercel.app"; 
const CONCURRENT_USERS = 100; // Testing at the failure threshold
const TEST_ID = Math.floor(Math.random() * 10000); 

const errorCounts = {};

async function simulateUser(id) {
    let stats = { success: 0, fail: 0 };
    const userEmail = `debug_stress_${TEST_ID}_${id}@example.com`;
    const userName = `Debug User ${id}`;

    try {
        // Step 1: Landing Page (GET)
        const resLanding = await fetch(`${BASE_URL}/fr`);
        if (!resLanding.ok) throw new Error(`HTTP_${resLanding.status}_LANDING`);
        stats.success++;

        // Step 2: Sign Up (POST) 
        const resSignup = await fetch(`${BASE_URL}/api/auth/sign-up/email`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Origin': BASE_URL 
            },
            body: JSON.stringify({
                email: userEmail,
                password: "Password123!",
                name: userName,
                callbackURL: `${BASE_URL}/fr/dashboard`
            })
        });
        
        if (!resSignup.ok) {
            const signupBody = await resSignup.text();
            // Group errors by status code + first 30 chars of message
            const errorMsg = signupBody.substring(0, 40).replace(/\n/g, ' ');
            throw new Error(`SIGNUP_${resSignup.status}_[${errorMsg}]`);
        }
        stats.success++;

        // Step 3: Dashboard Access (GET)
        const resDash = await fetch(`${BASE_URL}/fr/dashboard`);
        if (!resDash.ok) throw new Error(`HTTP_${resDash.status}_DASHBOARD`);
        stats.success++;

    } catch (err) {
        const errorKey = err.message;
        errorCounts[errorKey] = (errorCounts[errorKey] || 0) + 1;
        stats.fail++;
    }

    return stats;
}

async function runTest() {
    console.log(`\n� STARTING ERROR IDENTIFICATION SCAN...`);
    console.log(`🌍 Target: ${BASE_URL}`);
    console.log(`👥 Simulating ${CONCURRENT_USERS} concurrent signups...\n`);

    const batch = Array.from({ length: CONCURRENT_USERS }, (_, i) => simulateUser(i));
    await Promise.all(batch);

    console.log(`\n--- 📂 TOP ERROR CAUSES IDENTIFIED ---`);
    const sortedErrors = Object.entries(errorCounts).sort((a, b) => b[1] - a[1]);
    
    if (sortedErrors.length === 0) {
        console.log("✅ PERFECT: No errors detected at this load.");
    } else {
        sortedErrors.forEach(([cause, count]) => {
            console.log(`[x${count}] ${cause}`);
        });
    }
    console.log(`---------------------------------------\n`);
    
    if (errorCounts["SIGNUP_500_[{\"code\":\"INTERNAL_SERVER_ERROR\"}]"] || 
        JSON.stringify(errorCounts).includes("P2024") || 
        JSON.stringify(errorCounts).includes("Too many connections")) {
        console.log("� DIAGNOSIS: Your Database (Render) is saturated. It cannot handle this many parallel connections.");
    }
}

runTest();
