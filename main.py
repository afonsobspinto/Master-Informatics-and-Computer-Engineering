from apps.LaptopApp import LaptopApp


def main():
    app = LaptopApp()
    try:
        app.start()
    except:
        exit(0)


if __name__ == "__main__":
    main()
