import { rest } from "msw";
import { setupServer } from "msw/node";
import mockWordArray from "./mockWordArray.json";

// Mock Service Worker setup for mocking API calls.
const server = setupServer(
    rest.get(
        "https://api.dictionaryapi.dev/api/v2/entries/en/mother",
        (_req, res, ctx) => res(ctx.json({ mockWords: mockWordArray }))
    )
);

beforeAll(() => server.listen());
afterAll(() => server.close());
