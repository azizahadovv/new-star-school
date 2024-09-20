import * as React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import teacherController from '../service/teacher';

const animatedComponents = makeAnimated();

function Position() {
  const [selectedValues, setSelectedValues] = React.useState([]);
  const [userRoles, setUserRoles] = React.useState([]);

  React.useEffect(() => {
    fetchUserRoles();
  }, []);

  const fetchUserRoles = async () => {
    const { roles } = await teacherController.getTeacherInId(42);
    const options = transformToOptions(roles);
    setUserRoles(options);
    setSelectedValues(roles); // Default tanlovlar sifatida rol qo'shish
  };

  const transformToOptions = (roles) =>
    roles.map(role => ({ value: role, label: capitalize(role) }));

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleSelectChange = (options) => {
    const values = options ? options.map(opt => opt.value) : [];
    setSelectedValues(values);
  };

  console.log(userRoles);
  console.log(selectedValues);

  return (
    <div>

      <table>
        <thead>

        </thead>
        <tbody>

        </tbody>
      </table>



      <Select
        value={userRoles.filter(opt => selectedValues.includes(opt.value))}
        onChange={handleSelectChange}
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={userRoles}
      />
    </div>
  );
}

export default Position;
