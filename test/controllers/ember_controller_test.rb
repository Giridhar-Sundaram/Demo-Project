require "test_helper"

class EmberControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get ember_index_url
    assert_response :success
  end
end
