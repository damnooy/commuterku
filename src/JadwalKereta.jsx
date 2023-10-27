import { useEffect, useState } from "react";
import Layout from "./layout/layout";
import { Icon } from "@iconify/react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

export default function JadwalKereta() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dataStasiun, setDataStasiun] = useState([]);
  const [stasiun, setStasiun] = useState("");
  const [dariJam, setDariJam] = useState("");
  const [sampaiJam, setSampaiJam] = useState("");
  const [dataJadwal, setDataJadwal] = useState([]);
  const [dataPerjalanan, setDataPerjalanan] = useState([]);

  useEffect(() => {
    fetch("https://api-partner.krl.co.id/krlweb/v1/krl-station")
      .then((res) => res.json())
      .then((res) => {
        setDataStasiun(res.data);
      });
  }, []);

  const handleSubmitData = () => {
    fetch(
      `https://api-partner.krl.co.id/krlweb/v1/schedule?stationid=${stasiun}&timefrom=${dariJam}&timeto=${sampaiJam}`
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log(res)
        setDataJadwal(res.data);
      });
  };

  const handleDetail = (train_id) => {
    fetch(
      `https://api-partner.krl.co.id/krlweb/v1/schedule-train?trainid=${train_id}`
    )
      .then((res) => res.json())
      .then((res) => {
        onOpen();
        setDataPerjalanan(res.data);
      });
  };

  return (
    <Layout>
      <>
        <div className="tabel">
          <div className="mb-2">
            <label for="exampleFormControlInput1" className="form-label">
              Pilih Stasiun
            </label>
            <select
              value={stasiun}
              onChange={(e) => setStasiun(e.target.value)}
              id="stasiun"
              className="form-select"
              aria-label="Default select example"
            >
              <option value="">Dari Stasiun Mana?</option>
              {dataStasiun.map((i) => (
                <option key={i.sta_id} value={i.sta_id}>
                  {i.sta_name}
                </option>
              ))}
            </select>
          </div>
          <div className="d-flex">
            <div className="mb-2 w-100">
              <label for="exampleFormControlInput1" className="form-label">
                Dari Jam
              </label>
              <select
                value={dariJam}
                onChange={(e) => setDariJam(e.target.value)}
                id="jamAwal"
                className="form-select"
                aria-label="Default select example"
              >
                <option value=""> -- </option>
                <option value="00:00">00:00</option>
                <option value="01:00">01:00</option>
                <option value="02:00">02:00</option>
                <option value="03:00">03:00</option>
                <option value="04:00">04:00</option>
                <option value="05:00">05:00</option>
                <option value="06:00">06:00</option>
                <option value="07:00">07:00</option>
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
                <option value="20:00">20:00</option>
                <option value="21:00">21:00</option>
                <option value="22:00">22:00</option>
                <option value="23:00">23:00</option>
              </select>
            </div>
            <div className="mb-2 w-100 jam">
              <label for="exampleFormControlInput1" className="form-label">
                Sampai Jam
              </label>
              <select
                value={sampaiJam}
                onChange={(e) => setSampaiJam(e.target.value)}
                id="jamAkhir"
                className="form-select"
                aria-label="Default select example"
              >
                <option value=""> -- </option>
                <option value="00:00">00:00</option>
                <option value="01:00">01:00</option>
                <option value="02:00">02:00</option>
                <option value="03:00">03:00</option>
                <option value="04:00">04:00</option>
                <option value="05:00">05:00</option>
                <option value="06:00">06:00</option>
                <option value="07:00">07:00</option>
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
                <option value="20:00">20:00</option>
                <option value="21:00">21:00</option>
                <option value="22:00">22:00</option>
                <option value="23:00">23:00</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => handleSubmitData()}
            className="btn btn-danger mt-3 w-100"
          >
            Lihat
          </button>
          <div id="listJadwal">
            {dataJadwal.map((i) => (
              <div
                key={i.train_id}
                className="kereta bg-white mt-3 d-flex align-items-center"
              >
                <Icon className="logo-kereta" icon="ion:train-outline"></Icon>
                <div className="d-flex justify-content-between w-100">
                  <div className="info d-inline-block mx-2">
                    <p className="no-kereta my-0">{i.train_id}</p>
                    <h4 className="jurusan mt-2">{i.dest}</h4>
                    <Button
                      onClick={() => handleDetail(i.train_id)}
                      colorScheme="blue"
                    >
                      Detail
                    </Button>
                  </div>
                  <div className="d-inline-block">
                    <p className="my-0 text-end" style={{ color: `black` }}>
                      Jam
                    </p>
                    <h4 className="mt-2" style={{ color: `#C70039` }}>
                      {i.time_est}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Detai Perjalanan</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ul>
                {dataPerjalanan.map((i) => (
                  <li key={i.station_name}>
                    {i.time_est}: {i.station_name}
                  </li>
                ))}
              </ul>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </Layout>
  );
}
