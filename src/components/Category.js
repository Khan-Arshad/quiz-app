import { useState, useEffect } from 'react'

const Category = ({ setCategory }) => {

        const [categories, setCategories] = useState([]);
        const [error, setError] = useState(null);


        // Handle Difficulty
const handleCategoryChange = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
    console.log(e.target.value);
  }

useEffect(() => {
     //   Fetch Data
        fetch("https://opentdb.com/api_category.php")
            .then((response) => {
                    return response.json();
            })
            .then((data) => {
                setCategories(data.trivia_categories);
                console.log(data);
            }
            )
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError(error);
            }
            )
}, [])

    

  return (
    <div className="selection">  
        <label>Choose a category:</label>
        <select className="select" id="category" onChange={handleCategoryChange}>
        <option value="">Category</option>
        {categories.map((category) => (
            <option value={category.id} key={category.id}>{category.name}</option>
        ))}
    </select>
    </div>
  )
}

export default Category