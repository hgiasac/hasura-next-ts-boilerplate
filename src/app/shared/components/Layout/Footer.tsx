function Footer() {
  return (
    <footer className="bg-blue-500">
      <ul className="flex items-center justify-between max-w-4xl mx-auto p-4 md:p-8 text-sm text-white">
        <li>
          Designed by{" "}
          <a href="https://bryant.io" target="_blank" className="font-bold">
            Taylor Bryant
          </a>
        </li>

        <li>
          <a
            href="https://github.com/hgiasac/hasura-next-ts-boilerplate/tree/tailwind"
            target="_blank"
            className="font-bold"
          >
            GitHub
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
