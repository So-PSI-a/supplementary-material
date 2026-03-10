/**
 * A nitro plugin to reset and seed the database initially on startup.
 */
export default defineNitroPlugin(async () => {
    const { result: resetResult } = await runTask('db:reset');
    const { result: seedResult } = await runTask('db:seed');

    console.log(resetResult);
    console.log(seedResult);
});
