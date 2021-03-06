import './FoodDetails.css'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { addToDb2 } from '../fakedb/fakedb';
import { Container, Grid, LinearProgress } from '@mui/material';


export default function FoodDetails() {


    const [currentFood, setCurrentFood] = useState({})
    const [isLoading, setIsLoading] = useState(false)


    const [itemCount, setItemCount] = useState(1)
    const { foodId } = useParams();



    useEffect(() => {
        setIsLoading(true)
        fetch('https://resturent-api.herokuapp.com/foods')
            .then(res => res.json())
            .then(data => {

                const found = data.find(element => element._id === foodId);
                setCurrentFood(found)
                setIsLoading(false)
            })

    }, [foodId]);

    const handleItemPlus = () => {
        setItemCount(itemCount + 1)

    }


    const handleItemMinus = () => {
        setItemCount(itemCount - 1)

    }
    const handleAddCartButton = () => {
        addToDb2(currentFood._id, itemCount);
        // console.log('item added')
        console.log(currentFood)
        alert('Item Added')
    }

    return (
        <Container >
            {
                isLoading &&
                <div style={{ height: '40vh' }}><LinearProgress /></div>
            }
            {!isLoading &&
                <Grid container spacing={2}>
                    <Grid item xs={12} md={5} style={{ textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div >
                            <h1>{currentFood.name}</h1>
                            <p>{currentFood.description}</p>
                            <div className='countFood-div-wrapper-food-details'>

                                <h1 >${(currentFood.price * itemCount).toFixed(2)} </h1>

                                <div className='countFood-div-food-details'>
                                    <button name='-' onClick={handleItemMinus} >-</button>
                                    <button>{itemCount}</button>
                                    <button name='+' onClick={handleItemPlus}>+</button>
                                </div>
                            </div>
                            <button onClick={handleAddCartButton} className='btn-add-food-details'><ShoppingCartIcon />Add</button>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <div style={{}}>
                            <img style={{ width: '100%', clipPath: 'circle()' }} src={currentFood.img} alt='food' />

                        </div>
                    </Grid>
                </Grid>
            }
        </Container>
    )
}
