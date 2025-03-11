export class LoggerService {
  static log(message: string) {
    if (process.env.DEPLOY_ENV === "k8s") {
      console.log(`[K8s] ${message}`);
    } else if (process.env.DEPLOY_ENV === "serverless") {
      console.log(`[Serverless] ${message}`);
    } else {
      console.log(`[Local] ${message}`);
    }
  }
}
