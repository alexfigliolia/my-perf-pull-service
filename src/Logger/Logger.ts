import chalk from "chalk";

export class Logger {
  private static readonly NOOP = () => {};
  private static readonly _LOG = console.log;
  private static LOG = this._LOG;

  public static core = (...messages: any[]) => {
    this.LOG(chalk.blueBright.bold("Async Service:"), ...messages);
  };

  public static silence() {
    this.LOG = this.NOOP;
  }

  public static listen() {
    this.LOG = this._LOG;
  }
}
