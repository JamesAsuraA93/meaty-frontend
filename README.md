## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them run `bun install`

### Setup your API request

1. Login to Kong Admin Dashboard
2. On sidebar click `Consumers`
3. Create new consumer with name your project and set tags is **Service**
4. After created consumer. Click consumer name then click tab `Credentials`
5. Create `Key Authentication` credential without input any input
6. Copy API KEY and save to .env file key named `GATWAY_APIKEY`

### Bootstrap your site

A step by step series of examples that tell you how to get a development environment running:

1. Create project folder `mkdir my-new-mm-project && cd my-new-mm-project`
2. Clone this template by `git clone {{Project URL}} .`
3. Install dependency
4. Get started `bun run dev`

## The Component

This project primarily utilizes components created internally or references components from a third-party library: [shadcn/ui](shadcn/ui).

For the example you can run this project and [CLICK HERE](http://localhost:3000) to watch example of each components.

Using Components:

- Components within the @/components/ui folder follow snake_case naming conventions.
- For detailed component usage and documentation, refer to the provided link: [shadcn/ui](shadcn/ui).

## What this template provide

This project template offers several key features to jumpstart your development:

- **Authentication Service**

  - Integrates seamlessly with the Authentication Service via Single Sign-On (SSO).
  - Important:
    If using local authentication, run the **mmauth-service** and **auth-client** projects concurrently.

- **API Utils**

  - Provides utilities for interacting with APIs located in the `/utils` folder.
  - Usage:
    - Combine Api Util with UrlBuilder to construct API requests.
    - Configure API endpoints in the `@/config/apiEndpoint.ts` file.

  ```ts
  const url = new CombineEndpoint("KEY_OF_ENDPOINT")
    .query({
      q1: "a",
    })
    .build();
  const resp = await api.post<TPostResponse>(url, {
    bodyKey1: "abc",
    bodyKey2: "abc",
  });
  ```

  > Note:
  > For complex requests beyond Api Util capabilities, contact the template maintainer for feature upgrades. Alternatively, this project includes the popular `axios` library for more advanced use cases.

- **Service Communicate Handler**

  - Addresses a previous issue related to service communication, where returned objects (success or failure) could have inconsistent types.
  - Solution:
    A handler is implemented in `@/@type/handler.ts` to ensure consistent typing for responses.

  ```ts
  async function someService() {
    try {
      // logic here...
      return success(data);
    } catch {
      return failure(someErrorObj as MMApiErrorShape);
      // Cast error object to expected type
    }
  }
  ```

  > Note:
  > In the failure call, cast the someErrorObj to the expected type MMApiErrorShape.# meaty-frontend
