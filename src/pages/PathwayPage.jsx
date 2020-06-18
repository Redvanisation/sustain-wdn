import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { baseUrl } from '../helpers/';

const PathwayPage = (props) => {
  const history = useHistory();
  const currentUser = JSON.parse(localStorage.getItem('user')) || {};
  const pathway = JSON.parse(localStorage.getItem('pathway')) || {};

  useLayoutEffect(() => {
    if (pathway.length < 1) {
      if (currentUser && currentUser.role === 'user') {
        history.push(`/user/${currentUser.user_id}`);
      } else if (currentUser && currentUser.role === 'facilitator') {
        history.push(`/facilitator/${currentUser.user_id}`);
      } else {
        history.push('/');
      }
    };
  });
  
  
  // const pathway = props.location.pathway;


  console.log(pathway)
  return (
    <main className="pathway">
      <header className="pathway__header">
        <h2 className="pathway__header--title title is-2">
          {pathway.title}
        </h2>
        <p className="pathway__header--description subtitle is-5">
          {pathway.subtitle}
          {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae harum beatae, fugiat explicabo fugit at totam neque omnis odio perspiciatis vitae qui eius asperiores, minus repudiandae error, natus sunt eveniet? */}
        </p>
      </header>

      <section className="pathway__content">
        <h3 className="pathway__content--title title is-4">
          About {pathway.title} Pathway
        </h3>
        <p className="pathway__content--description">
          {pathway.description}
          {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus omnis at iste sint eveniet quod cumque accusamus voluptate ut, dignissimos repellendus pariatur quis voluptatum aspernatur in architecto illum dolor excepturi!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nesciunt atque dolorem officia perspiciatis qui quae voluptate adipisci molestiae magni? Tempore beatae aut doloremque? Laborum totam eveniet dolorum vitae eius.
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus cupiditate fugit dolorem, maiores iure nam amet tenetur libero accusantium molestiae aliquid enim totam non commodi itaque soluta mollitia labore reprehenderit.
          Delectus quas at qui velit dolorem rerum doloremque consectetur fugit recusandae voluptatibus blanditiis esse ratione excepturi illum beatae impedit optio dignissimos, nulla modi minima magnam eum porro amet dicta. Necessitatibus?
          Voluptas tempore iste ea possimus ex debitis, impedit laudantium vel assumenda libero provident ipsum totam numquam, blanditiis deleniti nisi? Repudiandae quaerat sapiente in temporibus necessitatibus, eveniet accusamus dolorem amet ratione?
          Fuga sit fugiat sequi, ut impedit optio ipsam debitis mollitia tempora, velit asperiores vero alias libero ipsa tempore error ad eius reiciendis dolorem repellendus provident dignissimos quam possimus. Ab, fuga.
          Voluptatem voluptate autem rem. Laboriosam nam atque quaerat ex. Reprehenderit dolorum quae hic esse dolores optio ratione, perspiciatis laudantium ducimus, quibusdam deserunt unde mollitia maiores modi recusandae, repudiandae magnam dicta.
          Quos, numquam ex est dignissimos neque animi consectetur qui dolorum sed aut molestias dolores eaque facilis vitae magnam cum ducimus facere ut dolorem corrupti assumenda dolor possimus in officia. Eaque?
          Assumenda quod officia eum tenetur perspiciatis ipsum sed recusandae quia reiciendis optio vel vero suscipit autem illum rerum aperiam deleniti fugit ab neque, nam minus sint temporibus voluptate. Ut, voluptates.
          Accusamus magnam blanditiis tempora, sed quod est et assumenda vel tempore provident officiis libero eius illo quasi omnis recusandae, esse alias nostrum consequatur, odit amet nam ratione laboriosam. Optio, sequi?
          Odit explicabo quia delectus corporis totam dolorem perferendis vel quo a illum, eveniet ipsum modi iusto voluptatem pariatur nam similique dolorum asperiores, quidem alias. Quae eos labore dicta voluptatum ab.
          Beatae quia ea nemo perferendis nisi porro expedita! Consectetur temporibus ratione adipisci commodi iure maiores aliquid incidunt fugiat alias quibusdam, dolores praesentium nobis porro doloremque ab minus! Corrupti, eum asperiores. */}
        </p>

        <div className="pathway__content--btns-container">
          <button className="pathway__content--btn button is-info">Set as active pathway</button>
          <button className="pathway__content--btn button is-dark">Add to favorite pathways</button>
        </div>

      </section>
    </main>
  );
};

export default PathwayPage;
