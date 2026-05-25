module.exports = {
  testEnvironment: 'node',
  reporters: [
    'default',
    [
      // 🔥 ปรับเหลือแค่นี้พอ เพื่อตัดปัญหาสแลชเพี้ยนใน Windows
      'jest-html-reporter', 
      {
        pageTitle: 'Condo API Test Report',
        outputPath: './reports/api-test-report.html',
        includeFailureDetails: true,
        includeConsoleLog: true
      }
    ]
  ]
};