using System;
using System.Linq;
using AutoMapper;
using HanJie.CSLCN.Common.MapperProfile;

namespace HanJie.CSLCN.Common
{
    public static class Mapper
    {
        private static IMapper _mapper;

        static Mapper()
        {
            var config = new MapperConfiguration(cfg => {
                foreach (Type item in AppDomain.CurrentDomain.GetAssemblies().SelectMany(asm=>asm.GetTypes()))
                {
                    if (typeof(Profile).IsAssignableFrom(item) && string.Equals(item.Namespace, "HanJie.CSLCN.Common.MapperProfile"))
                        cfg.AddProfile(item);
                }
            });

            _mapper = config.CreateMapper();
        }

        public static TDestination Map<TDestination>(object source)
        {
            return _mapper.Map<TDestination>(source);
        }

        public static TDestination Map<TDestination>(object source,TDestination destination)
        {
            return _mapper.Map<object, TDestination>(source, destination);
        }
    }
}
