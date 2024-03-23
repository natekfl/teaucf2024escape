import { Suspense, useState } from "react";
import { trpc } from "./utils/trpc";
import { httpBatchLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HmiPage from "./routes/hmi";

const router = createBrowserRouter([
    {
        path: "/hmi",
        element: <HmiPage />,
    },
])

const queryClient = new QueryClient()
export const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            url: 'http://localhost:2024',
        }),
    ],
})

function App() {

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <Suspense>
                    <RouterProvider router={router} />
                </Suspense>
            </QueryClientProvider>
        </trpc.Provider>
    );
}

export default App;
