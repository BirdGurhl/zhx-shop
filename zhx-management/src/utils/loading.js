import nProgress from "nprogress";
import "nprogress/nprogress.css";
export function nprogressLoading() {
  nProgress.start();
  setTimeout(() => {
    nProgress.done();
  }, 200);
}
