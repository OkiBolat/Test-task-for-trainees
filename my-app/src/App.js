import styles from './App.module.scss';
import CatalogList from './components/CatalogList/CatalogList';
import ComicsItem from './components/ComicsItem/ComicsItem';
import Counter from './components/Counter/Counter';
import Navbar from './components/Navbar/Navbar';
import Section from './components/Section/Section';
import TableUsers from './components/TableUsers/TableUsers';
import TestClassComponent from './components/TestClassComponent/TestClassComponent';
import TestFuncComponent from './components/TestFuncComponent/TestFuncComponent';

// function App(){

// }

function App() {
  let headingArr=["#","Name","Age","Gender","Address","Photo"]
  let usersArr=[{
    "id":1,
    "name":"Adam",
    "age":"25",
    "gender":"male",
    "address":"Kazan",
    "url":"https://s-cdn.sportbox.ru/images/styles/upload/fp_fotos/f3/69/16cdb0303addd04a2e3201953b1e862260c6212b8db69233755827.jpg"
  },
  {
    "id":2,
    "name":"Eva",
    "age":"30",
    "gender":"female",
    "address":"Moscow",
    "url":"https://s-cdn.sportbox.ru/images/styles/upload/fp_fotos/f3/69/16cdb0303addd04a2e3201953b1e862260c6212b8db69233755827.jpg"
  }
]
  return (
    <div className={styles. App}>
    <Section>
      <Navbar/>
            <TestClassComponent />
            <TestFuncComponent/>
            <TableUsers heading={headingArr} users={usersArr}/>
            <Counter/>
            <CatalogList/>
    </Section>
    </div>
  );
}

export default App;
