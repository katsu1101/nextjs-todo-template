
export class ConfigService {
  static get(key: string): string {
    if (process.env.DEPLOY_ENV === "k8s") {
      // Kubernetes ConfigMap 用
      return process.env[key] || "";
    } else if (process.env.DEPLOY_ENV === "serverless") {
      // AWS Lambda / Cloud Run 環境変数
      return process.env[key] || "";
    } else {
      // Docker Compose / ローカル開発
      return process.env[key] || "";
    }
  }
}
