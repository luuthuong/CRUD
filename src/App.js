

import { Button, CircularProgress } from '@mui/material';

import Avatar from './components/avatar/Avatar';

import { useEffect, useRef, useState } from 'react';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import EditIcon from '@mui/icons-material/Edit';

import FormCustom from './formcustom/FormCustom';

import {v4 as uuidv4 } from 'uuid';

const Element=({src,name,email,onDelete,onEdit})=>{
	return (
		<div className='element'>
			<div className='element-avatar'>
				<Avatar src={src}/>
			</div>
			<div className="element-content">
				<div>
					{name}
				</div>
				<div>
					{email}
				</div>
			</div>
			<div className="btn-group">
				<DeleteForeverIcon onClick={onDelete}/>
				<EditIcon onClick={onEdit}/>
			</div>
		</div>
	)
}

function App() {
	const [state,setState]=useState([])
	const [form,setForm]=useState({
		active:false,
		data:{},
		feature:''
	});
	
	const getApi= async()=>{
		const res=await fetch('https://reqres.in/api/users');
		const data=await res.json()
		setState(data.data)
	}
	console.log(state);
	useEffect(()=>{
		getApi()
	},[])
	const deleteData=(index)=>{
		setState((state)=>state.filter((item,id)=>index!==id))
	}


	return (
		state?(<div className="App">
				<div className={`container ${form.active?'activeblur':''}`}>
				<h1 className="App-header">Information</h1>
				<div className="container-content">
				{
					state.map((item,index)=>{
						return (
							<div key={index}>
								<Element 
										src={item.avatar}
										name={`${item.first_name} ${item.last_name}`}
										email={item.email}
										onDelete={()=>deleteData(index)}
										onEdit={()=>{
											setForm({data:item,active:true,feature:'Update'})
										}}
								/>
							</div>
						)
					})
				}
				</div>
				<Button onClick={()=>{
							setForm({data:'',active:true,feature:'ADD'})
						}
						} variant="contained" style={{marginTop:'10px'}}>ADD</Button>
				</div>
				{
				(form.active)&&
				<FormCustom 
						actionContent={form.feature}
						data={form.data}
						handleData={(data)=>{
							return form.feature==='ADD'?setState([...state,{...data,id:uuidv4()}]):
								setState(state.map((item)=>{
									return item.id===data.id?data:item
								}))
						}}
						onCancel={()=>{
							setForm({...form,active:false})
						}} 
			/>
			}
			
		</div>):<CircularProgress/>
	);
}

export default App;
