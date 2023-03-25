// import Head from 'next/head'
// import Image from 'next/image'
// import { Inter } from 'next/font/google'
// import from '@/Home.module.css'
import React, { useState, useEffect } from "react";
import localForage from "localforage";
import "./todo.css";
import { gsap } from "gsap";


function App() {

  localForage.config({
    driver: localForage.LOCALSTORAGE,
    name: "bee-day to do list",
    version: 1.0,
    storeName: "todos",
  });
  const defaultTodos = [
    {
      title: "animal",
      content: "Let loose, play some good tunes and dance.",
      completed: 0,
      total: 3,
    },
    {
      title: "bedbug",
      content:
        "Snuggle up in bed for a day of treats and shows. Bonus have a hot bath.",
      completed: 0,
      total: 3,
    },
    {
      title: "bella",
      content: "Try a new food or restaurant.",
      completed: 0,
      total: 3,
    },
    {
      title: "brownie",
      content: "Beat a new video game.",
      completed: 0,
      total: 3,
    },
    {
      title: "byron",
      content: "Play some board or card games.",
      completed: 0,
      total: 3,
    },
    {
      title: "dangler",
      content: "Go to see live entertainment",
      completed: 0,
      total: 2,
    },
    {
      title: "fay",
      content: "Go for walks in nature.",
      completed: 0,
      total: 5,
    },
    {
      title: "hugstable",
      content:
        " Melt away with a relaxing session of hugs, snuggles, hair play, back massage or drawing.",
      completed: 0,
      total: 3,
    },
    {
      title: "mac",
      content: "Bake some tasty treats.",
      completed: 0,
      total: 3,
    },
    {
      title: "moose",
      content: "Get some hiking shoes and go for some hikes.",
      completed: 0,
      total: 3,
    },
    { title: "owlette", content: "Read a book.", completed: 0, total: 1 },
    {
      title: "pinky",
      content: "Order something special for your self online.",
      completed: 0,
      total: 1,
    },
    {
      title: "pups",
      content: "Road trip some place you've yet to explore.",
      completed: 0,
      total: 2,
    },
    {
      title: "twinkles",
      content: "Relax and do some meditation.",
      completed: 0,
      total: 3,
    },
    {
      title: "zinger",
      content: "Visit a beautiful special garden and take pictures.",
      completed: 0,
      total: 2,
    },
  ];

  const [todoCount, setTodoCount] = useState<number>(0);
  const [todos, setTodos] = useState<any>(defaultTodos);
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setHasMounted(true);
    }, 3000);
  }, []);

  useEffect(() => {
    localForage.getItem("todos").then((value) => {
      setTodos(value || defaultTodos);
    });
  }, []);

  useEffect(() => {
    hasMounted && localForage.setItem("todos", todos);
    let totalCompleted = 0;
    todos.map((todo: any) => {return totalCompleted = todo.completed + totalCompleted;})
    setTodoCount(totalCompleted)
  }, [todos]);

  function handleClick(e: string) {
    // Target element
    const element = document.querySelector(`#${e}`);
    // const element = e.target;

    // Set initial state
    gsap.set(element, {
      scale: 1,
      rotation: 0,
      x: 0,
      y: 0,
    });

    // Create timeline
    const timeline = gsap.timeline();

    timeline
      .to(element, {
        duration: 1,
        scale: 2,
        rotation: 360,
        x: "50%",
        y: "50%",
        transformOrigin: "center",
        ease: "elastic(1.3,1).inOut",
      })
      .to(element, {
        duration: 0.7,
        delay: 1,
        scale: 1,
        rotation: 0,
        x: 0,
        y: 0,
        ease: "elastic(1,1).inOut",
      });
  }
  // function handleClick(e) {
  //   gsap
  //     .from(e.target, {
  //       scale: 3,
  //       duration: 0.3,
  //     })
  //     .to(e.target, {
  //       scale: 1,
  //     });
  // }

  function handleTodoChange(todoIndex : number, e : string) {
    handleClick(e);
    const updatedTodos = todos.map((todo: any, index: number) => {
      if (index === todoIndex) {
        return {
          ...todo,
          completed: todo.completed < todo.total ? todo.completed + 1 : 0,
        };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
    // await localForage.setItem("todos", updatedTodos);
  }

 
   


  return (
    <>
      <div className="container">
      <div className="title">a BEE's TO DO's</div>
      {/* <div className={container}></div> */}
      <div>
        {todos.map((todo: any, index: number) => (
          <div className="innercontainer"
            onClick={() => handleTodoChange(index, todo.title)}
            key= {todo.title + "key"}
          >
            <div className="name">{todo.title}</div>
            <div
              id={todo.title}
              className="headshot"
              // onClick={() => handleClick(todo.title)}
              style={{
                backgroundImage: `url("${todo.title}.webp")`,
              }}
            ></div>
            <div className="count">
              {todo.completed + "/" + todo.total}
            </div>
            <div className="description" key={index}>
              {todo.content}
            </div>
          </div>
        ))}
        <div className="counted">TOTAL {todoCount}/40</div>
      </div>
    </div>
</>
  )
}
export default App;