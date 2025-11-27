import { Polar } from "@polar-sh/sdk";

const servers = ["sandbox", "production"] as const;
type PolarServer = (typeof servers)[number];

function assertPolarServer(value?: string): asserts value is PolarServer {
  if (value !== "sandbox" && value !== "production") {
    throw new Error("Invalid POLAR_SERVER value");
  }
}

function assertPolarToken(value?: string): asserts value is string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error("Invalid POLAR_ACCESS_TOKEN value");
  }
}

assertPolarServer(process.env.POLAR_SERVER);
assertPolarToken(process.env.POLAR_ACCESS_TOKEN);

export const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server: process.env.POLAR_SERVER,
});
