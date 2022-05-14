package com.paf1.demorest1;

import java.util.Arrays;
import java.util.List;

//import jakarta.websocket.server.PathParam;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.UriInfo;

import javax.servlet.http.HttpServletRequest;


@Path("users")
public class UserResource 
{
	
	UserRepository repo =  new UserRepository();

	@Context
	private UriInfo context;
	
	@GET
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<User> getUsers()
	{
		System.out.println("getUser called");
		return repo.getUsers();  
	}
	
	
	
	@GET
	@Path("user/{id}")
	@Produces({MediaType.APPLICATION_JSON , MediaType.APPLICATION_XML})
	public User getUser(@PathParam("id") int id)
	{
		
		return repo.getUser(id);   
	}
	  
	
	
 	
	@POST
	@Path("user")
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public User createUser(final User u1)
	{
		repo.create(u1);
		return u1;
	}
	
	
	
	@PUT
	@Path("user")
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public User updateUser(final User u1)
	{

		if(repo.getUser(u1.getUserID()).getUserID()==0) 
		{
			repo.create(u1);
		}
		else
		{
			repo.update(u1);
		}

		return u1; 
	}
	
	
	@DELETE
	@Path("user/{id}")
	public User killUser(@PathParam("id") int id)
	{
		User u = repo.getUser(id);
		
		if(u.getUserID() != 0)
		{
			repo.delete(id);
		}
		
		
		return u;
	}
	
	
	
	
	 
}
















