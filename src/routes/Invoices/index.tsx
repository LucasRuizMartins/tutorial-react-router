import { Outlet, useSearchParams } from "react-router-dom";
import { getInvoices } from "../../data";
import { NavLink } from "react-router-dom";
import "./styles.css";

export default function Invoices() {
  let [searchParams, setSearchParams] = useSearchParams();

  const invoices = getInvoices();

  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        <div>{searchParams.get("price")}</div>

        <input
          value={searchParams.get("name") || ""}
          onChange={(event) => {
            let name = event.target.value;
            if (name) {
              setSearchParams({ name });
            } else {
              setSearchParams({});
            }
          }}
        />

        {invoices
          .filter((invoice) => {
            let name = searchParams.get("name");
            if (!name) return true;
            let invoiceName = invoice.name.toLowerCase();
            return invoiceName.startsWith(name.toLowerCase());
          })
          .map((invoice) => (
            <NavLink
              className={({ isActive }) =>
                isActive ? "dblock nav-red" : "dblock nav-blue"
              }
              style={{ display: "block", margin: "1rem 0" }}
              to={`/invoices/${invoice.number}`}
              key={invoice.number}
            >
              {invoice.name}
            </NavLink>
          ))}
      </nav>

      <Outlet />
    </div>
  );
}
