//imports:
import * as path from "path";
import * as fs from "fs";

//Get test data from env variables or fallback to testData.json
function getTestData() {
  const environment = "Stage";
  // Use process.cwd() for more reliable path resolution
  const testDataDirectory = path.join(process.cwd(), "testData");
  const testDataFile = `testData${environment}.json`;
  const testDataPath = path.join(testDataDirectory, testDataFile);
  try {
    if (!fs.existsSync(testDataPath)) {
      throw new Error(`Test data file not found: ${testDataPath}`);
    }
    const testDataContent = fs.readFileSync(testDataPath, "utf-8");
    console.log(`Loaded test data from: ${testDataPath}`);
    return JSON.parse(testDataContent);
  } catch (error) {
    console.error("Failed to load test data", error);
    throw error;
  }
}

export function getEnvData() {
  const testData = getTestData();
  console.log(`Using BASE_URL: ${testData.BASE_URL}`);

  return {
    BASE_URL: testData.BASE_URL,
  };
}
