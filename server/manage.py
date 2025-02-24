import os
import uvicorn


def main():

    # Define the port on which you want to run the server
    port = 8082
    # Enabled auto reload
    reload = True

    module_name = 'app.main:app'
    uvicorn.run(app=module_name, host='0.0.0.0',
                port=port, reload=reload, log_level="info")


if __name__ == "__main__":
    main()
