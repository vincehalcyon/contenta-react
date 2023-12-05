import 'styles/globals.css'
import 'styles/custom.css'
import 'tailwindcss/tailwind.css'
import DefaultLayout from 'layout/Layout';

export default function FoundationApp({ Component, pageProps }) {
  // React.useEffect(() => {
  //   const fn = () => {
  //     window.jQuery = require("../../public/js/javascript");
  //   };
  //   fn();
  // }, []);

  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}