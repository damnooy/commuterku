import React, { Children } from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";
export default function Layout({children}) {
    const location = useLocation();
  return (
    <>
      <div className="d-flex justify-content-center mt-2">
        <p className="judul my-0">DamCommuter</p>
      </div>
      <p
        className="d-flex justify-content-center my-0 watermark"
        style={{ color: `darkslategray` }}
      >
        API-From KAI
      </p>

      <div className="container p-3">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="row">
              <div className="col-md-4 mb-2">
                <Link to="/" className={`link ${location.pathname === "/" && "jadwal"}`}>
                  <Icon icon="lucide:clock" />
                  Jadwal Kereta
                </Link>
              </div>
              <div className="col-md-4 mb-2">
                <Link to="/tarif" className={`link ${location.pathname === "/tarif" && "jadwal"}`}>
                  <Icon icon="tdesign:money" />
                  Info Tarif
                </Link>
              </div>
              <div className="col-md-4 mb-2">
                <Link to="/rute" className={`link ${location.pathname === "/rute" && "jadwal"}`}>
                  <Icon icon="charm:map" />
                  Peta Rute
                </Link>
              </div>
            </div>

            {children}
          </div>
        </div>
      </div>
    </>
  );
}
