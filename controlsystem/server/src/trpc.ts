import { initTRPC } from '@trpc/server'
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from "cors"
 
const t = initTRPC.create()
 
export const router = t.router
export const publicProcedure = t.procedure

const appRouter = router({
  
})
 
export type AppRouter = typeof appRouter
 
const server = createHTTPServer({
  router: appRouter,
  middleware: cors(),
})
 
export function startTrpcServer() {
  server.listen(2024)
}