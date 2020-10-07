using System;
using System.Threading;
using System.Threading.Tasks;

namespace ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {

                Task.Run(() =>
                {
                    while (true)
                    {
                        Console.WriteLine("loop in task ..");
                        Thread.Sleep(3000);
                        throw new Exception("error has occured.");
                    }
                });

                Console.WriteLine("outside the task loop .");
                Console.ReadKey();
            }
            catch (Exception ex)
            {
                Console.WriteLine("catch the ex:" + ex.Message);
                Console.ReadKey();
            }
        }
    }
}
