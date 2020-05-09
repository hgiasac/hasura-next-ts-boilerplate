import { Workbox } from "workbox-window";

export default function (): void {

  // eslint-disable-next-line id-blacklist
  if (typeof window !== "undefined" && "serviceWorker" in navigator && !(window as any).workbox) {
    // add event listeners to handle any of PWA lifecycle event
    // https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-window.Workbox#events
    const workbox: Workbox = (window as any).workbox;
    workbox.addEventListener("installed", (event) => {
      console.log(`Event ${event.type} is triggered.`);
      console.log(event);
    });

    workbox.addEventListener("controlling", (event) => {
      console.log(`Event ${event.type} is triggered.`);
      console.log(event);
    });

    workbox.addEventListener("activated", (event) => {
      console.log(`Event ${event.type} is triggered.`);
      console.log(event);
    });

    // A common UX pattern for progressive web apps is to show a banner 
    // when a service worker has updated and waiting to install.
    // NOTE: set skipWaiting to false in next.config.js pwa object
    // https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
    workbox.addEventListener("waiting", () => {
      if (confirm("A new version is installed, reload to use the new version immediately?")) {
        workbox.addEventListener("controlling", () => {
          window.location.reload();
        });
        workbox.messageSW({ type: "SKIP_WAITING" });
      } else {
        // User rejected, new verion will be automatically load when user open the app next time.
      }
    });

    // ISSUE - this is not working as expected, why?
    // I could only make message event listenser work when I manually add this listenser into sw.js file
    workbox.addEventListener("message", (event) => {
      console.log(`Event ${event.type} is triggered.`);
      console.log(event);
    });

    /*
    window.workbox.addEventListener('redundant', event => {
      console.log(`Event ${event.type} is triggered.`)
      console.log(event)
    })
    window.workbox.addEventListener('externalinstalled', event => {
      console.log(`Event ${event.type} is triggered.`)
      console.log(event)
    })
    window.workbox.addEventListener('externalactivated', event => {
      console.log(`Event ${event.type} is triggered.`)
      console.log(event)
    })
    window.workbox.addEventListener('externalwaiting', event => {
      console.log(`Event ${event.type} is triggered.`)
      console.log(event)
    })
    */

    // never forget to call register as auto register is turned off in next.config.js
    workbox.register();
  }
}
