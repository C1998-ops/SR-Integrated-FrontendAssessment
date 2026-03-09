import react,{useState} from "react";
function useStudents(initialData) {
    const [students, setStudents] = useState(initialData);
  
    const addStudent = student => {
      setStudents(prev => [...prev, { ...student, id: Date.now() }]);
    };
  
    const updateStudent = updated => {
      setStudents(prev =>
        prev.map(s => (s.id === updated.id ? updated : s))
      );
    };
  
    const deleteStudent = id => {
      setStudents(prev => prev.filter(s => s.id !== id));
    };
  
    return { students, addStudent, updateStudent, deleteStudent };
  }