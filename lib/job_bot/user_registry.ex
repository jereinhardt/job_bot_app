defmodule JobBot.UserRegistry do
  @moduledoc """
    A registry that saves all of the users that are currently running crawler
    jobs and the options they selected.
  """
  use Agent

  def start_link(opts \\ []) do
    Agent.start_link(fn -> %{} end, name: __MODULE__)
  end

  def register(user_id, data) do
    Agent.update(__MODULE__, &Map.put(&1, user_id, data))
  end

  def get_user_data(user_id) do
    Agent.get(__MODULE__, &Map.get(&1, user_id))
  end

  def get_user_data(user_id, data) do
    get_user_data(user_id) |> Map.get(data)
  end

  def unregister(user_id) do
    Agent.update(__MODULE__, &Map.drop(&1, [user_id]))
  end
end