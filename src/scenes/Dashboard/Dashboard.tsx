import { useCallback, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import userAtom from "recoil/user";
import dataAtom from "recoil/data";
import { db, logout } from "provider/auth";

export const Dashboard = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [recoilData, setRecoilData] = useRecoilState(dataAtom);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const saveData = useCallback(() => {
    db.collection("data")
      .doc(`${user.id}`)
      .set({ data: inputValue })
      .then(() => setRecoilData(inputValue));
  }, [user.id, inputValue, setRecoilData]);

  const exit = useCallback(() => {
    logout();
    window.localStorage.removeItem("userToken");
    setUser({ ...user, isLogged: false });
  }, [user, setUser]);

  useEffect(() => {
    setIsLoading(true);
    let data: any;

    db.collection("data")
      .doc(`${user.id}`)
      .get()
      .then((document) => (data = (document.data() as any).data))
      .finally(() => {
        setIsLoading(false);
        setRecoilData(!!data ? data : "нет данных");
      });
  }, [user.id, setRecoilData]);

  return (
    <>
      {user.name}
      <br />
      {user.id}
      <br />
      <button onClick={exit}>выйти</button>
      <br />
      <br />
      <input
        // TODO: заюзать форму
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <br />
      <button onClick={saveData}>SAVE DATA</button>
      {isLoading && <p>загрузка...</p>}
      <h1>{recoilData}</h1>
    </>
  );
};
