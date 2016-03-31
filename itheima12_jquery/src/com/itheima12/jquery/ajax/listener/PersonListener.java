package com.itheima12.jquery.ajax.listener;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.itheima12.jquery.ajax.bean.Person;

public class PersonListener implements ServletContextListener{

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void contextInitialized(ServletContextEvent servletContext) {
		// TODO Auto-generated method stub
		/**
		 * 准备List
		 */
		List<Person> persons = new ArrayList<Person>();
		Person person1 = new Person();
		person1.setPid(1L);
		person1.setName("person1");
		person1.setDescription("person1des");
		
		Person person2 = new Person();
		person2.setPid(2L);
		person2.setName("person2");
		person2.setDescription("person2des");
		
		Person person3 = new Person();
		person3.setPid(3L);
		person3.setName("person3");
		person3.setDescription("person3des");
		
		persons.add(person1);
		persons.add(person2);
		persons.add(person3);
		
		servletContext.getServletContext().setAttribute("persons", persons);
	}

}
