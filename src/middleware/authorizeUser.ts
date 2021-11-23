import { Context } from "telegraf"

export function authorizeUser(ctx: Context, next: Function) {
    console.log(ctx.chat)

    next()
}