import { v4 } from "uuid";
const originalFetch = window.fetch;

export const consentsData = [
  {
    id: v4(),
    name: "John Doe",
    email: "john@mock.com",
    receiveNewsletter: true,
    showTargetedAds: false,
    contributeToStatistics: true,
  },
  {
    id: v4(),
    name: "Alice Smith",
    email: "alice@mock.com",
    receiveNewsletter: false,
    showTargetedAds: true,
    contributeToStatistics: false,
  },
];

// Custom fetch function to intercept and handle requests
window.fetch = async function (url, options) {
  if (url.endsWith("/consents") && (options?.method === "GET" || !options)) {
    // Mock GET /consents
    return new Promise((resolve) => {
      resolve({
        json: () => Promise.resolve({ data: consents }),
        status: 200,
        statusText: "OK",
      });
    });
  } else if (url.endsWith("/consents") && options.method === "POST") {
    // Mock POST /consents
    const body = JSON.parse(options.body);
    consents.push(body);

    return new Promise((resolve) => {
      resolve({
        json: () => Promise.resolve(body),
        status: 200,
        statusText: "OK",
      });
    });
  } else {
    // For other URLs or methods, use the original fetch function
    return originalFetch.apply(this, arguments);
  }
};
