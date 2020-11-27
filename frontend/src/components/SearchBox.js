import React,{useState} from 'react'
import {Form,Button} from 'react-bootstrap'


const SearchBox = ({history}) => {

    const [keyWord,setKeyWord] = useState('')

    const submitHandler = (e)=>{
        e.preventDefault()

        if(keyWord.trim()){
            history.push(`/search/${keyWord}`)
        }else{
            history.push('/')
        }
    }

    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control type='text' name='q' onChange={(e) => setKeyWord(e.target.value)} placeholder='Search product' className='mr-sm-2 ml-sm-5'></Form.Control>
            <Button variant='outline-success' className='p-2' type='submit' >Search</Button>
        </Form>
    )
}

export default SearchBox
