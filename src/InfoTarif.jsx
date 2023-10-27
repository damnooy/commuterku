import Layout from "./layout/layout";
import { useEffect, useState } from "react";

export default function InfoTarif() {
    const [dataStasiun, setDataStasiun] = useState([]);
    const [dariStasiun, setDariStasiun] = useState();
    const [keStasiun, setKeStasiun] = useState();
    const [tarif, setTarif] = useState();
    const [jarak, setJarak] = useState();

    useEffect(() => {
        fetch("https://api-partner.krl.co.id/krlweb/v1/krl-station")
          .then((res) => res.json())
          .then((res) => {
            setDataStasiun(res.data);
          });
      }, []);

const handleSubmitData = () => {
    fetch(`https://api-partner.krl.co.id/krlweb/v1/fare?stationfrom=${dariStasiun}&stationto=${keStasiun}`)
        .then((res) => res.json())
        .then((res) => {

          setTarif(res.data[0].fare);
          setJarak(res.data[0].distance);
        });
};

  return (
    <Layout>
      <>
      <div className="tabel">
          <div className="mb-2">
            <label for="exampleFormControlInput1" className="form-label">Pilih Stasiun Awal</label>
            <select onChange={(e) => setDariStasiun(e.target.value)} id="dariStasiun" className="form-select" aria-label="Default select example">
              <option value=""> --Pilih Stasiun-- </option>
              {dataStasiun.map((i) => (
                <option key={i.sta_id} value={i.sta_id}>{i.sta_name}</option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label for="exampleFormControlInput1" className="form-label">Pilih Stasiun Akhir</label>
            <select onChange={(e) => setKeStasiun(e.target.value)} id="keStasiun" className="form-select" aria-label="Default select example">
              <option value=""> --Pilih Stasiun-- </option>
              {dataStasiun.map((i) => (
                <option key={i.sta_id} value={i.sta_id}>{i.sta_name}</option>
              ))}
            </select>
            <button onClick={() => handleSubmitData()} className="btn btn-danger mt-3 w-100 w-100">Lihat</button>
          </div>
        </div>
        <div className="d-flex">
          <span id="tarif" className="mt-3 w-100 hasil">Rp.{tarif}</span>
          <span id="jarak" className="mt-3 w-100">{jarak} Meter</span>
        </div>
      </>
    </Layout>
  );
}
