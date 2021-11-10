import find from 'find-up'

export const findEnv = () => find.sync(process.env.DB == "cloud" ? '.env' : '.env.test')
